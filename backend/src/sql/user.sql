insert into users (username, "fullName", password, "realRole", "roleId", status, email,doet_id)
values ('nhanvien', 'Nhân viên', '$argon2id$v=19$m=65536,t=3,p=4$jcZYnh86gnd3u3ZhsFDjDQ$j/JnxLj/3q9b88n0jYMzaDOKJL+sm7ssw2/LRxz4h9o', 'Nhân viên bảo vệ', 1, true, 'nhanvien@example.com', 1)
ON CONFLICT (username) DO UPDATE SET "fullName" = EXCLUDED."fullName", password = EXCLUDED.password, "realRole" = EXCLUDED."realRole", "roleId" = EXCLUDED."roleId", status = EXCLUDED.status, email = EXCLUDED.email;

insert into users (username, "fullName", password, "realRole", "roleId", status, email,doet_id)
values ('chuyenvien', 'Chuyên viên', '$argon2id$v=19$m=65536,t=3,p=4$jcZYnh86gnd3u3ZhsFDjDQ$j/JnxLj/3q9b88n0jYMzaDOKJL+sm7ssw2/LRxz4h9o', 'Chuyên viên kiki', 2, true, 'chuyenvien@example.com', 2)
ON CONFLICT (username) DO UPDATE SET "fullName" = EXCLUDED."fullName", password = EXCLUDED.password, "realRole" = EXCLUDED."realRole", "roleId" = EXCLUDED."roleId", status = EXCLUDED.status, email = EXCLUDED.email;

insert into users (username, "fullName", password, "realRole", "roleId", status, email,doet_id)
values ('lanhdao', 'Lãnh đạo', '$argon2id$v=19$m=65536,t=3,p=4$jcZYnh86gnd3u3ZhsFDjDQ$j/JnxLj/3q9b88n0jYMzaDOKJL+sm7ssw2/LRxz4h9o', null, 3, true, 'lanhdao@example.com', 3)
ON CONFLICT (username) DO UPDATE SET "fullName" = EXCLUDED."fullName", password = EXCLUDED.password, "realRole" = EXCLUDED."realRole", "roleId" = EXCLUDED."roleId", status = EXCLUDED.status, email = EXCLUDED.email;

insert into users (username, "fullName", password, "realRole", "roleId", status, email,doet_id)
values ('superadmin', 'Quản trị viên', '$argon2id$v=19$m=65536,t=3,p=4$jcZYnh86gnd3u3ZhsFDjDQ$j/JnxLj/3q9b88n0jYMzaDOKJL+sm7ssw2/LRxz4h9o', null, 4, true, 'superadmin@example.com', 4)
ON CONFLICT (username) DO UPDATE SET "fullName" = EXCLUDED."fullName", password = EXCLUDED.password, "realRole" = EXCLUDED."realRole", "roleId" = EXCLUDED."roleId", status = EXCLUDED.status, email = EXCLUDED.email;
